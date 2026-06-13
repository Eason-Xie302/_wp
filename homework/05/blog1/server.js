const express = require('express');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const { marked } = require('marked');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'blog-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.userId ? true : false;
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

const DB_PATH = path.join(__dirname, 'blog.db');

async function getDb() {
  const SQL = await initSqlJs();
  let db;
  if (fs.existsSync(DB_PATH)) {
    const data = fs.readFileSync(DB_PATH);
    db = new SQL.Database(data);
  } else {
    db = new SQL.Database();
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, display_name TEXT, bio TEXT)');
    db.run('CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, user_id INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
  }
  return db;
}

let db;

async function initDb() {
  db = await getDb();
  saveDb();
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function getUserById(userId) {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  stmt.bind([userId]);
  let user = null;
  if (stmt.step()) {
    user = stmt.getAsObject();
  }
  stmt.free();
  return user;
}

function getUserByUsername(username) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  stmt.bind([username]);
  let user = null;
  if (stmt.step()) {
    user = stmt.getAsObject();
  }
  stmt.free();
  return user;
}

app.get('/', (req, res) => {
  const stmt = db.prepare('SELECT posts.*, users.username as author FROM posts LEFT JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC');
  const posts = [];
  while (stmt.step()) {
    posts.push(stmt.getAsObject());
  }
  stmt.free();
  res.render('index', { posts });
});

app.get('/my-posts', (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect('/login');
  }
  const stmt = db.prepare('SELECT posts.*, users.username as author FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.user_id = ? ORDER BY posts.created_at DESC');
  stmt.bind([req.session.userId]);
  const posts = [];
  while (stmt.step()) {
    posts.push(stmt.getAsObject());
  }
  stmt.free();
  const userInfo = getUserById(req.session.userId);
  res.render('my-posts', { posts, userInfo });
});

app.get('/user/:username', (req, res) => {
  const user = getUserByUsername(req.params.username);
  if (!user) {
    return res.redirect('/');
  }
  const stmt = db.prepare('SELECT posts.*, users.username as author FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.user_id = ? ORDER BY posts.created_at DESC');
  stmt.bind([user.id]);
  const posts = [];
  while (stmt.step()) {
    posts.push(stmt.getAsObject());
  }
  stmt.free();
  res.render('user-profile', { posts, userInfo: user, isOwner: res.locals.loggedIn && req.session.userId === user.id });
});

app.get('/post/:id', (req, res) => {
  const stmt = db.prepare('SELECT posts.*, users.username as author FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.id = ?');
  stmt.bind([req.params.id]);
  if (stmt.step()) {
    const post = stmt.getAsObject();
    stmt.free();
    post.html = marked(post.content);
    res.render('post', { post, userId: req.session.userId });
  } else {
    stmt.free();
    res.redirect('/');
  }
});

app.get('/new', (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect('/login');
  }
  res.render('new');
});

app.post('/new', (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect('/login');
  }
  const { title, content } = req.body;
  if (title && content) {
    db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, req.session.userId]);
    saveDb();
  }
  res.redirect('/my-posts');
});

app.get('/delete/:id', (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect('/login');
  }
  db.run('DELETE FROM posts WHERE id = ? AND user_id = ?', [req.params.id, req.session.userId]);
  saveDb();
  res.redirect('/my-posts');
});

app.get('/register', (req, res) => {
  if (res.locals.loggedIn) {
    return res.redirect('/');
  }
  res.render('register', { error: null });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('register', { error: '請填寫所有欄位' });
  }
  try {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    saveDb();
    res.redirect('/login');
  } catch (e) {
    res.render('register', { error: '用戶名已存在' });
  }
});

app.get('/login', (req, res) => {
  if (res.locals.loggedIn) {
    return res.redirect('/');
  }
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  stmt.bind([username, password]);
  if (stmt.step()) {
    const user = stmt.getAsObject();
    stmt.free();
    req.session.userId = user.id;
    req.session.user = user.username;
    res.redirect('/');
  } else {
    stmt.free();
    res.render('login', { error: '用戶名或密碼錯誤' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

initDb().then(() => {
  app.listen(3000, () => {
    console.log('網誌系統已啟動：http://localhost:3000');
  });
});

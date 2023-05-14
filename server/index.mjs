import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/',(req,res)=>{
  res.send('hai')
})


app.post('/login', async (req, res) => {
  try {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_msg: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post('/search',async (req,res)=>{
  const {searchInput,jwtToken}=req.body
  const response = await fetch(`https://apis.ccbp.in/insta-share/posts?search=${searchInput}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      
    });
    const data = await response.json();
    res.status(response.status)
    res.json(data);
})
app.post('/stories',async (req,res)=>{
  const {jwtToken}=req.body

  const response = await fetch(`https://apis.ccbp.in/insta-share/stories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });

    const data = await response.json();
    res.status(response.status)
    res.json(data);
})
app.post('/posts',async (req,res)=>{
  const {jwtToken}=req.body

  const response = await fetch(`https://apis.ccbp.in/insta-share/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    

    const data = await response.json();
    res.status(response.status)
    res.json(data);
})
app.post('/myprofile',async (req,res)=>{
  const {jwtToken}=req.body

  const response = await fetch(`https://apis.ccbp.in/insta-share/my-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    

    const data = await response.json();
    res.status(response.status)
    res.json(data);
})
app.post('/userprofile',async (req,res)=>{
  const {jwtToken,userId}=req.body

  const response = await fetch(`https://apis.ccbp.in/insta-share/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    

    const data = await response.json();
    res.status(response.status)
    console.log(data)
    res.json(data);
})


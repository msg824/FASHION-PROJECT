var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 쿠키 이용하여 로그인 처리 먼저 하기
// 로그인을 하고 난 후 보내는 API 요청마다 쿠키 정보를 검사하여 쿠키에 있는 jwt가 유효한지 검사
const verifyToken = (token) => {
    try {
        console.log(token);

        // const clientToken = req.signedCookies.user;
        
        // return clientToken
        // const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);

        // console.log(clientToken);
        // console.log(decoded);

        // if (decoded) {
        //     res.locals.userId = decoded.user_id;
        //     next();

        // } else {
        //     res.status(401).json({ error: 'unauthorized' });

        // }

        return token

    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};

/* GET home page. */
router.get('/cookie', (req, res) => {
    res.cookie('cookies', 'is sweet', { signed: true });
    res.send(req.signedCookies);
});

router.get('/auth', (req, res) => {
    const cookieLoginObj = req.signedCookies;
    console.log('cookie', req.signedCookies.user)
    console.log('mberSn', cookieLoginObj.mberSn)
  
    if (cookieLoginObj && cookieLoginObj.mberSn !== '') {
        console.log('있음');
    } else {
        console.log('없음');
    }
    // const result = verifyToken();
    // res.send(result);
})

module.exports = router;

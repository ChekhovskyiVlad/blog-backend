import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log(token)
    if(token) {
        try {
            // расшифровуем токен
            const decoded = jwt.verify(token, 'secret234')
            req.userId = decoded._id;
            next()
        } catch (error) {
            return res.status(403).json({
                message: 'No access'
            })
        }
    } else {
        return res.status(403).json({
            message: 'No access'
        })
    }
}
// 1:14:20
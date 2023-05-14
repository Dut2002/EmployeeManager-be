
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

function authenticateRoles(roles) {
    return (req, res, next) => {
        // Lấy token từ header của request
        const token = req.headers.authorization;

        if (token) {
            // Xác thực token và trích xuất thông tin về người dùng
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    res.status(401).json({ error: 'Token không hợp lệ' });
                } else {
                    // Tìm kiếm người dùng trong cơ sở dữ liệu
                    User.findOne({ username: decoded.username })
                        .then(user => {
                            if (!user || !roles.includes(user.role)) {
                                res.status(403).json({ error: 'Bạn không có quyền truy cập tài nguyên này' });
                            } else {
                                // Đính kèm thông tin về người dùng vào đối tượng request để sử dụng trong controller
                                req.user = user;
                                next();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({ error: 'Lỗi server, vui lòng thử lại sau' });
                        });
                }
            });
        } else {
            res.status(401).json({ error: 'Bạn cần đăng nhập để truy cập tài nguyên này' });
        }
    };
}

module.exports = authenticateRoles;
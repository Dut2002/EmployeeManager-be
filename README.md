# Run Project
1. Vào thư mục sql, lấy file script.sql và chạy file trên MySql
2. Mở thư mục project, chạy lệnh `npm i` trong Terminal để cài đặt project
3. Chạy lệnh `npm start` trong Terminal để chạy project

# Port
1. Project đang chạy ở port 3000
2. Chỉnh sửa port: vào thư mục src, mở index.js, thay đổi giá trị biến port

# Database connect
1. Project hiện chỉ có thể kết nối với database của MySQL
2. Chỉnh sửa kết nối: vào thư mục config, mở config,json

Ví dụ:
1. "username": "root",               //User connection, mặc định mysql là root
2. "password": "admin123",           //Mật khẩu user connection
3. "database": "student_management", //Tên database
4. "host": "127.0.0.1",              //port, ở đây là port của localhost
5. "dialect": "mysql"                //có thể thay đối thành các db server khác nhưng project sẽ phải cài thêm thư viện hỗ trợ

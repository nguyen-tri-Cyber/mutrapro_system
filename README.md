# mutrapro_system
Custom Music Transcription and Production System

Chúng ta sẽ xây dựng 6 services độc lập, mỗi service đảm nhiệm một chức năng cụ thể dựa trên thiết kế cơ sở dữ liệu của bạn.
Khởi tạo chung cho mỗi Service
Trong thư mục của mỗi service (ví dụ: services/auth-service), bạn hãy mở terminal và chạy các lệnh sau:
1. Khởi tạo dự án Node.js: npm init -y
2. Cài đặt các thư viện cần thiết: npm install express mysql2 dotenv cors

Khởi chạy Docker ở mục mutropro_system:
docker-compose down
docker-compose up --build

Tạo Cấu trúc Bảng trong Database
Cách thực hiện:
1. Mở một công cụ quản lý cơ sở dữ liệu như MySQL Workbench, DBeaver, hoặc thậm chí là terminal.
2. Kết nối tới database MySQL đang chạy trong Docker của bạn với thông tin sau:
- Host/Server Address: localhost (hoặc 127.0.0.1)
- Port: 3306
- Username: root
- Password: your_strong_password (mật khẩu bạn đã đặt trong file docker-compose.yml)

pass mysql: your_strong_password

Chạy web dùng: nmp start ở mục web-app

Danh sách tài khoản mẫu:
1. Điều phối viên (Coordinator)

Chức năng: Tiếp nhận yêu cầu, phân công nhiệm vụ cho các chuyên viên.


Tên: Coordinator A

Email: coordinator@mutrapro.com

Mật khẩu: 123456

2. Chuyên viên Ký âm (Transcriber)

Chức năng: Nhận file audio và chuyển thành bản nhạc.

Tên: Transcriber A

Email: transcriber@mutrapro.com

Mật khẩu: 123456

3. Chuyên viên Phối khí (Arranger)

Chức năng: Nhận bản nhạc và yêu cầu để tạo bản phối mới.

Tên: Arranger A

Email: arranger@mutrapro.com

Mật khẩu: 123456

4. Nghệ sĩ Thu âm (Artist)

Chức năng: Thực hiện thu âm giọng hát hoặc nhạc cụ.

Tên: Artist A

Email: artist@mutrapro.com

Mật khẩu: 123456

5. Quản trị viên Phòng thu (Studio Admin)

Chức năng: Quản lý lịch đặt phòng, duyệt yêu cầu.


Tên: Studio Admin A

Email: studioadmin@mutrapro.com

Mật khẩu: 123456

6. Quản trị Hệ thống (Admin)

Chức năng: Quản lý toàn bộ hệ thống, tài khoản, và xem báo cáo.


Tên: Admin

Email: admin@mutrapro.com

Mật khẩu: 123456





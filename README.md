# mutrapro_system
Custom Music Transcription and Production System

mutrapro_system/
├── docker-compose.yml                  # Dựng toàn hệ thống (SQL + backend)
│
├── backend/                            # API chính (Node.js + Express + MSSQL)
│   ├── Dockerfile                      # Build container backend
│   ├── .env.example                    # Config mẫu (chạy local)
│   ├── .env.docker                     # Config chạy Docker (DB container)
│   ├── docker-entrypoint.sh            # Script khởi động container (chờ DB → init.sql → start)
│   ├── package.json                    # Danh sách dependency
│   └── src/
│       ├── app.js                      # Khởi động server, đăng ký routes
│       │
│       ├── config/
│       │   └── db.js                   # Kết nối SQL Server (mssql)
│       │
│       ├── middleware/
│       │   ├── authRequired.js         # Kiểm tra JWT
│       │   └── errorHandler.js         # Middleware xử lý lỗi chung
│       │
│       ├── utils/
│       │   ├── password.js             # Hash/match mật khẩu
│       │   └── response.js             # Chuẩn hóa phản hồi
│       │
│       ├── modules/                    # Các module tách biệt (định hướng microservice)
│       │   ├── auth/                   # Đăng ký / đăng nhập
│       │   │   ├── auth.routes.js
│       │   │   └── auth.controller.js
│       │   │
│       │   ├── users/                  # Quản lý user & role
│       │   │   ├── users.routes.js
│       │   │   └── users.controller.js
│       │   │
│       │   ├── requests/               # Tiếp nhận, gán, theo dõi yêu cầu
│       │   │   ├── requests.routes.js
│       │   │   └── requests.controller.js
│       │   │
│       │   ├── studios/                # Quản lý phòng thu / booking
│       │   │   ├── studios.routes.js
│       │   │   └── studios.controller.js
│       │   │
│       │   ├── notifications/          # Gửi / xem thông báo
│       │   │   ├── notifications.routes.js
│       │   │   └── notifications.controller.js
│       │   │
│       │   └── files/                  # Upload file (URL giả lập)
│       │       ├── files.routes.js
│       │       └── files.controller.js
│       │
│       └── scripts/                    # Công cụ tạo & khởi tạo DB
│           ├── init.sql                # Tạo DB, bảng, seed roles, services
│           └── runInitSql.js           # Chạy init.sql từ Node.js
│
├── frontend-web/                       # Web client (HTML/CSS/JS thuần)
│   ├── index.html                      # Giao diện chính (đăng nhập, tạo yêu cầu)
│   ├── styles.css                      # CSS cơ bản
│   └── app.js                          # Gọi API, hiển thị danh sách
│
├── mobile-app/                         # Ứng dụng di động (Expo React Native)
│   ├── App.js                          # App chính
│   ├── api.js                          # Gọi API
│   ├── package.json
│   └── app.json
│
└── documents/                          # Tài liệu nộp cho giảng viên
    ├── 1_User_Requirements.docx
    ├── 2_SRS.docx
    ├── 3_Architecture_Design.docx
    ├── 4_Detailed_Design.docx
    ├── 5_Testing_Plan.docx
    ├── 6_Installation_Guide.docx
    ├── 7_User_Manual.docx
    ├── 8_System_Implementation_Report.docx
    └── Diagrams/
        ├── UML_Usecase.png
        ├── UML_Sequence.png
        ├── UML_Deployment.png
        └── ERD.png

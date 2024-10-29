const app = require('../index');
const request = require('supertest');
const  userControllers  = require('../controllers/userControllers');



const mockRequest = (body = {}) => ({ body }) // ini untuk kirim request body
const mockResponse = () => {
    const res = {} // ===> ini untuk menampun response json dan response status

    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)

    return res
}


describe('userControllers - Berhasil Mengambil Data Akun', () => {
    test('200 ===> pesan "Berhasil menampilkan daftar akun" dan data pengguna', async () => {
        const req = mockRequest();
        const res = mockResponse();

        // Simulasi pengambilan data pengguna
        await userControllers.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200); // Mengecek bahwa status 200 telah dipanggil
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: "success",
            message: "Users retrieved successfully",
            data: expect.any(Array) // Mengharapkan data adalah array
        })); 
    });
});

describe('userControllers - Gagal Mengambil Data Akun', () => {
    test('404 ===> pesan "Data akun tidak ditemukan" jika akun kosong', async () => {
        // Menggunakan mock untuk mengembalikan array kosong
        jest.spyOn(prisma.users, 'findMany').mockResolvedValue([]);

        const req = mockRequest();
        const res = mockResponse();

        await userControllers.getUsers(req, res);
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Data akun tidak ditemukan"
        });
    });
});

describe('userControllers - Mencari Pengguna Berdasarkan ID', () => {
    test('200 ===> pesan "Pengguna ditemukan" dan data pengguna', async () => {
        const userId = 1; // Contoh ID pengguna
        const req = mockRequest({ params: { id: userId } });
        const res = mockResponse();

        // Simulasi pengambilan pengguna berdasarkan ID
        jest.spyOn(prisma.users, 'findUnique').mockResolvedValue({
            id: userId,
            username: "testuser",
            email: "testuser@example.com",
            // Tambahkan field lain sesuai dengan model Anda
        });

        await userControllers.findUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: "success",
            message: "Pengguna ditemukan",
            data: expect.objectContaining({
                id: userId,
                username: "testuser",
                email: "testuser@example.com",
            }),
        }));
    });

    test('404 ===> pesan "Pengguna tidak ditemukan" jika ID tidak valid', async () => {
        const userId = 999; // ID yang tidak ada
        const req = mockRequest({ params: { id: userId } });
        const res = mockResponse();

        // Simulasi pengambilan pengguna berdasarkan ID yang tidak ada
        jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(null);

        await userControllers.findUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Pengguna tidak ditemukan" });
    });

    test('500 ===> menangani kesalahan server', async () => {
        const userId = 1;
        const req = mockRequest({ params: { id: userId } });
        const res = mockResponse();

        // Simulasi kesalahan saat pengambilan data pengguna
        jest.spyOn(prisma.users, 'findUnique').mockRejectedValue(new Error("Kesalahan database"));

        await userControllers.findUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "Gagal mengambil pengguna",
            error: "Kesalahan database"
        });
    });
});







// describe('akun ditemukan', () => {
//     test('akun ditemukan', async () => {
//         const res = await request(app).get('/api/v1/users');
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual({ message: "Daftar data akun kosong" });
//     });
// });

// describe('Detail Akun', () => {
//     test("sukses get all user", async () => {
//         const respons = await request(app).get("/api/v1/accounts");
//         expect(respons.status).toBe(201);
//         expect(respons.body).toHaveProperty("data");
//         expect(respons.body).toHaveProperty(
//             "message",
//             "berhasil menampilkan daftar akun"
//         );
//     });
// });

// describe('Menambah Akun Baru', () => {
//     test('Berhasil menambahkan akun baru', async () => {
//         const newUser = { username: "testuser", email: "testuser@example.com", password: "password" };
//         const res = await request(app).post('/api/v1/users').send(newUser);
//         expect(res.status).toBe(201);
//         expect(res.body).toHaveProperty('id');
//     });
// });
        

// describe('Detail Akun', () => {
//     test('Dapat menampilkan data detail dari satu akun', async () => {
//         const userId = 1; // Contoh ID akun
//         const res = await request(app).get(`/api/v1/users/${userId}`);
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty('id', userId);
//         expect(res.body).toHaveProperty('username'); 
//     });
// });
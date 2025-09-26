import multer from 'multer';
import path from 'path';

// ການກຳນົດທາງການເກັບຟາຍຕາມ fieldname
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images');
    } else if (file.fieldname === 'video') {
      cb(null, 'uploads/videos');
    } else {
      cb(null, 'uploads/others'); // ຖ້າມີຟາຍອື່ນໆ
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  },
});

const upload = multer({ storage });

export default upload;

import { User } from "./user.model";

export class SubJenisCuti {
  id: string;
  name: string;
  jenisCutiId: string;
  createdAt: Date;
  updatedAt: Date;
}
export class JenisCuti {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subJenisCuti?: SubJenisCuti[];
}

export class CreateCutiRequest {
    idJenisCuti: string;
    idSubJenisCuti?: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    keterangan?: string;
    fileUrl?: string;
    supervisorId?: string;
}

export class GetListCutiResponse {
    id: string;
    jenisCuti: string;
    subJenisCuti?: string;
    tanggalMulai: Date;
    tanggalSelesai: Date;
    keterangan?: string;
    fileUrl?: string;
    status: string;
    userId: string;
    supervisor: string;
    createdAt: Date;
    updatedAt: Date;
}
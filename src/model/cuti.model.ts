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
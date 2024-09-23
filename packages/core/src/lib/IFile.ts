export default interface IFile {
  save(buffer: ArrayBuffer): Promise<void>;
  delete(): Promise<void>;
  exists(): Promise<boolean>;
}

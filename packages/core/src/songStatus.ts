import DenoKVModel from "./lib/DenoKVModel.ts";

export const SongStatusType = {
  NOT_EXIST: "NOT_EXIST",
  QUEUED: "QUEUED",
  DOWNLOADING: "DOWNLOADING",
  EXIST: "EXIST",
} as const;

const songStatusModel = new DenoKVModel<SongStatus>([
  "status",
  "song",
]);

export type SongStatusType = typeof SongStatusType[keyof typeof SongStatusType];
export type SongStatus = {
  cid: string;
  status: SongStatusType;
  lastTimestamp: number;
};

export async function getSongStatus(songCid: string): Promise<SongStatus> {
  const [status] = await songStatusModel.get(songCid);
  return status ??
    {
      cid: songCid,
      lastTimestamp: Date.now(),
      status: SongStatusType.NOT_EXIST,
    };
}

export async function getSongStatuses(
  songCids: string[],
): Promise<Record<string, SongStatus>> {
  return await songStatusModel.getManyAsRecord(
    songCids,
    (cid) => ({
      cid: cid as string,
      status: SongStatusType.NOT_EXIST,
      lastTimestamp: Date.now(),
    }),
  );
}

export async function setSongStatuses(
  songCids: string[],
  status: SongStatusType,
): Promise<void> {
  await songStatusModel.setMany(
    "status",
    songCids.map((cid) => ({ cid, status, lastTimestamp: Date.now() })),
  );
}

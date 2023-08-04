import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";

export async function cidOf(buffer, name) {
  const helia = await createHelia({ start: false });
  const fs = unixfs(helia);
  const cid = await fs.cp(
    await fs.addBytes(buffer),
    await fs.addDirectory(),
    name
  );
  return cid.toString();
}

import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`; // not scalable, if a lot of users were to upload at the same time, but should do for now
  
    // Storage.vault.put uploads file
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type
    });
  
    return stored.key;
}
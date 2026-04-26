import { $ } from "bun";
import { allow, ignore, out } from "./consts.ts";

// Ensure output directory exists & clean previous build
const outDir = out.substring(0, out.lastIndexOf("/"));
await $`mkdir -p ${outDir}`;
const outFile = Bun.file(out);
if (await outFile.exists()) {
	await outFile.delete();
}

// Build exclude flags for zip
const excludeFlags = ignore.flatMap((p) => ["-x", `*/${p}`, "-x", p]);

// Zip each allowed directory into the output archive
for (const dir of allow) {
	await $`zip -r ${out} ${dir} ${excludeFlags}`;
}

const size = Bun.file(out).size;
console.log(`\nCreated ${out} (${(size / 1024 / 1024).toFixed(2)} MB)`);

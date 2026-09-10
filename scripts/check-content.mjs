import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
function evaluate(
  source,
  require = () => {
    throw new Error("Unexpected import in content");
  },
) {
  const compiled = ts.transpile(source, { module: ts.ModuleKind.CommonJS });
  const exports = {};
  new Function("exports", "require", compiled)(exports, require);
  return exports;
}
const { projects } = evaluate(read("src/data/projects.ts"), (path) => {
  assert.ok(
    path.startsWith("../assets/"),
    `Unexpected project import: ${path}`,
  );
  assert.ok(
    existsSync(new URL(path, new URL("src/data/", root))),
    `Missing image: ${path}`,
  );
  return { default: path };
});
const slugs = projects.map((project) => project.slug);
assert.ok(slugs.length > 0, "No projects found");
assert.equal(new Set(slugs).size, slugs.length, "Project slugs must be unique");
const keys = new Set();
for (const project of projects) {
  for (const required of [
    "titleKey",
    "descriptionKey",
    "summaryKey",
    "roleKey",
  ])
    assert.ok(project[required], `${project.slug}: missing ${required}`);
  for (const [field, value] of Object.entries(project))
    if (field.endsWith("Key")) keys.add(value);
  assert.ok(
    project.images.every(Boolean),
    `${project.slug}: invalid image import`,
  );
}
function collect(path) {
  for (const entry of readdirSync(new URL(path, root), {
    withFileTypes: true,
  })) {
    const child = `${path}/${entry.name}`;
    if (entry.isDirectory()) collect(child);
    else if (entry.name.endsWith(".tsx")) {
      for (const match of read(child).matchAll(/\bt\("([^"]+)"/g))
        keys.add(match[1]);
    }
  }
}
collect("src");
for (const locale of ["en", "es"]) {
  const { dict } = evaluate(read(`src/localizations/i18n/${locale}.ts`));
  for (const key of keys) {
    assert.equal(
      typeof dict[key],
      "string",
      `${locale}: missing content ${key}`,
    );
    assert.ok(dict[key].trim(), `${locale}: empty content ${key}`);
  }
  console.log(
    `${locale}: verified ${keys.size} project and UI content keys; ${projects.length} projects with valid images`,
  );
}
const { galleryCaptions } = evaluate(read("src/data/galleryCaptions.ts"));
for (const project of projects.filter((project) => project.images.length)) {
  for (const locale of ["en", "es"]) {
    const captions = galleryCaptions[project.slug]?.[locale];
    assert.equal(
      captions?.length,
      project.images.length,
      `${project.slug}: ${locale} captions must match the gallery`,
    );
    assert.ok(
      captions.every((caption) => caption.trim()),
      `${project.slug}: empty gallery caption`,
    );
  }
}
console.log("Gallery captions match all screenshots in both languages");

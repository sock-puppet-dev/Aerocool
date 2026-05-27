import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { getDatabase, MissingDatabaseConnectionError } from "@netlify/database";

const outputPath = resolve("data/generated/reviews.json");
const emptySnapshot = { product: {} };

async function main() {
  let db;
  let snapshot = emptySnapshot;

  try {
    db = getDatabase();

    const result = await db.sql`
      SELECT
        id,
        target_type,
        target_id,
        language,
        rating,
        author_name,
        body,
        created_at,
        approved_at
      FROM reviews
      WHERE status = ${"approved"}
      ORDER BY approved_at DESC NULLS LAST, created_at DESC
    `;

    const rows = Array.isArray(result) ? result : result.rows || [];
    snapshot = buildSnapshot(rows);
  } catch (error) {
    if (error instanceof MissingDatabaseConnectionError) {
      console.warn("Netlify Database is not available; writing empty reviews snapshot.");
    } else {
      throw error;
    }
  } finally {
    if (db?.pool?.end) {
      await db.pool.end();
    }
  }

  await writeSnapshot(snapshot);
}

function buildSnapshot(rows) {
  const snapshot = { product: {} };

  for (const row of rows) {
    if (row.target_type !== "product") {
      continue;
    }

    const targetID = String(row.target_id || "").trim();
    const language = String(row.language || "").trim();

    if (!targetID || !language) {
      continue;
    }

    snapshot.product[targetID] ??= {};
    snapshot.product[targetID][language] ??= {
      ratingValue: 0,
      reviewCount: 0,
      reviews: [],
    };

    snapshot.product[targetID][language].reviews.push({
      id: String(row.id),
      rating: Number(row.rating),
      authorName: String(row.author_name || "").trim(),
      body: String(row.body || "").trim(),
      createdAt: toISODate(row.created_at),
      approvedAt: toISODate(row.approved_at || row.created_at),
    });
  }

  for (const targetsByLanguage of Object.values(snapshot.product)) {
    for (const reviewGroup of Object.values(targetsByLanguage)) {
      const total = reviewGroup.reviews.reduce((sum, review) => sum + review.rating, 0);
      reviewGroup.reviewCount = reviewGroup.reviews.length;
      reviewGroup.ratingValue = Number((total / reviewGroup.reviewCount).toFixed(1));
    }
  }

  return snapshot;
}

function toISODate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}

async function writeSnapshot(snapshot) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
}

main().catch((error) => {
  console.error("Failed to export approved reviews.", error);
  globalThis.process.exitCode = 1;
});

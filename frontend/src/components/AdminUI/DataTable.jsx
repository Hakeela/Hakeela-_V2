import { useMemo, useState } from "react";

/**
 * Reusable admin data table with search, sortable columns and numbered pagination.
 *
 * columns: [{ key, header, render?(row), sortable?=true, sortAccessor?(row), align? }]
 * rows: array of objects
 * searchKeys: array of row keys used by the search box
 * filters: optional React node rendered in the toolbar (extra dropdowns/tabs)
 */
function DataTable({
  columns,
  rows,
  searchKeys = [],
  searchPlaceholder = "Search…",
  pageSize = 6,
  filters = null,
  initialSort = null,
  minWidth = 640,
  emptyText = "Nothing to show.",
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);

  const val = (row, key) => (row == null ? "" : row[key]);

  const processed = useMemo(() => {
    let r = rows;
    if (q && searchKeys.length) {
      const t = q.toLowerCase();
      r = r.filter((row) => searchKeys.some((k) => String(val(row, k) ?? "").toLowerCase().includes(t)));
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      const acc = col?.sortAccessor || ((row) => val(row, sort.key));
      r = [...r].sort((a, b) => {
        let va = acc(a), vb = acc(b);
        if (typeof va === "string") va = va.toLowerCase();
        if (typeof vb === "string") vb = vb.toLowerCase();
        if (va < vb) return sort.dir === "asc" ? -1 : 1;
        if (va > vb) return sort.dir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return r;
  }, [rows, q, sort, searchKeys, columns]);

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const curPage = Math.min(page, totalPages);
  const start = (curPage - 1) * pageSize;
  const pageRows = processed.slice(start, start + pageSize);

  const toggleSort = (key) => {
    setPage(1);
    setSort((s) => (s && s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  };

  const SortIcon = ({ active, dir }) => (
    <span className={`adm-sort ${active ? "is-active" : ""}`}>
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {active && dir === "desc" ? <polyline points="6 9 12 15 18 9" /> : <polyline points="6 15 12 9 18 15" />}
      </svg>
    </span>
  );

  return (
    <div>
      <div className="adm-toolbar">
        {searchKeys.length > 0 && (
          <div className="adm-searchbox">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder={searchPlaceholder} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
          </div>
        )}
        {filters}
      </div>

      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table" style={{ minWidth }}>
            <thead>
              <tr>
                {columns.map((c) => {
                  const sortable = c.sortable !== false;
                  const active = sort?.key === c.key;
                  return (
                    <th
                      key={c.key}
                      className={sortable ? "adm-th-sort" : ""}
                      onClick={sortable ? () => toggleSort(c.key) : undefined}
                      style={{ textAlign: c.align || "left" }}
                    >
                      <span className="adm-th-inner">
                        {c.header}
                        {sortable && <SortIcon active={active} dir={sort?.dir} />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, i) => (
                <tr key={row.id ?? i}>
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align || "left" }}>
                      {c.render ? c.render(row) : val(row, c.key)}
                    </td>
                  ))}
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr><td colSpan={columns.length} style={{ textAlign: "center", color: "#9a9a9a", padding: 32 }}>{emptyText}</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {processed.length > pageSize && (
          <div className="adm-pager">
            <span className="adm-pager__info">
              {start + 1}–{Math.min(start + pageSize, processed.length)} of {processed.length}
            </span>
            <div className="adm-pager__pages">
              <button className="adm-pager__btn" disabled={curPage === 1} onClick={() => setPage(curPage - 1)} aria-label="Previous page">‹</button>
              {Array.from({ length: totalPages }, (_, n) => n + 1).map((n) => (
                <button key={n} className={`adm-pager__btn ${n === curPage ? "is-on" : ""}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="adm-pager__btn" disabled={curPage === totalPages} onClick={() => setPage(curPage + 1)} aria-label="Next page">›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;

import { useEffect, useMemo, useState } from "react";
import { Listing, listings as initialData } from "../data/listings";

export function useListings(pageSize: number) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [dataState, setDataState] = useState<Listing[]>(initialData);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [editTarget, setEditTarget] = useState<Listing | null>(null);

  const filtered = useMemo<Listing[]>(
    () =>
      dataState.filter(
        (row) =>
          row.name.toLowerCase().includes(search.toLowerCase()) ||
          row.location.toLowerCase().includes(search.toLowerCase()),
      ),
    [dataState, search],
  );

  useEffect(() => {
    setPage(0);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice(page * pageSize, page * pageSize + pageSize);

  function handleDelete(row: Listing) {
    setDataState((d) => d.filter((r) => r.id !== row.id));
    setDeleteTarget(null);
  }

  function handleEdit(updated: Partial<Listing>) {
    if (!editTarget) return;
    setDataState((prev) =>
      prev.map((item) =>
        item.id === editTarget.id ? { ...item, ...updated } : item,
      ),
    );
    setEditTarget(null);
  }

  return {
    search,
    setSearch,
    page,
    setPage,
    paginated,
    filtered,
    totalPages,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    handleDelete,
    handleEdit,
  };
}

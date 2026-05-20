"use client";
import { useListings } from "../../hooks/useListings";
import { useListingsColumns } from "../../hooks/useListingsColumns";
import { ListingsToolbar } from "./ListingsToolbar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { DeleteModal } from "./DeleteModal";
import AddNewPropertyModal from "./AddNewPropertyModal";

export default function ActiveListing({ pageSize = 3 }) {
  const {
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
  } = useListings(pageSize);

  const columns = useListingsColumns({
    onEdit: setEditTarget,
    onDelete: setDeleteTarget,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <ListingsToolbar search={search} onSearch={setSearch} />

      <DataTable columns={columns} data={paginated} rowKey="id" />

      {deleteTarget && (
        <DeleteModal
          listing={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />
      )}
      {editTarget && (
        <AddNewPropertyModal
          editData={editTarget}
          onClose={() => setEditTarget(null)}
          onSubmit={handleEdit}
        />
      )}

      <Pagination
        showing={paginated.length}
        total={filtered.length}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        canPrev={page > 0}
        canNext={page < totalPages - 1}
      />
    </div>
  );
}

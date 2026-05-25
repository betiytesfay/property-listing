"use client";

import { useListings } from "../../hooks/useListings";
import { useListingsColumns } from "../../hooks/useListingsColumns";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { DeleteModal } from "./DeleteModal";
import AddNewPropertyModal from "./AddNewPropertyModal";

interface ActiveListingProps {
  pageSize?: number;
  externalSearch: string;
  externalFilter: string | null;
  initialData: any[];
  isLoadingExternal: boolean;
  onRefresh: () => void;
}

export default function ActiveListing({ 
  pageSize = 4, 
  externalSearch, 
  externalFilter,
  initialData,
  isLoadingExternal,
  onRefresh,
}: ActiveListingProps) {
  
  const {
    page,
    setPage,
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

  // Client filtering pipeline combining data stream with external search states
  const filteredData = initialData.filter((property) => {
    // 1. Text Search execution against schema attributes
    const matchesSearch = 
      !externalSearch ||
      property.title?.toLowerCase().includes(externalSearch.toLowerCase()) ||
      property.address?.toLowerCase().includes(externalSearch.toLowerCase());

   let matchesFilter = true;

if (externalFilter) {
  if (externalFilter === "Published") {
    matchesFilter =
      property.is_active === true &&
      property.listing_fee_paid === true;
  }

  else if (externalFilter === "Pending Payments") {
    matchesFilter = property.listing_fee_paid === false;
  }

  else if (externalFilter === "Inactive Listings") {
    matchesFilter =
      property.is_active === false &&
      property.listing_fee_paid === true;
  }

  else if (externalFilter === "Total Listings") {
    matchesFilter = true;
  }
}


    return matchesSearch && matchesFilter;
  });

  // Client-side pagination slice window logic calculations
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = page * pageSize;
  const paginatedData = filteredData.slice(skip, skip + pageSize);

  const wrappedHandleDelete = async () => {
    await handleDelete();
    onRefresh();
  };

  const wrappedHandleEdit = async (data: FormData) => {
    await handleEdit(data);
    onRefresh();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {isLoadingExternal ? (
        <div className="p-12 text-center text-sm text-slate-400 animate-pulse">
          Syncing property matrix database...
        </div>
      ) : (
        <DataTable  
        
        columns={columns} 
        data={paginatedData} rowKey="property_id" />
      )}

      {deleteTarget && (
        <DeleteModal
          listing={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDelete={wrappedHandleDelete}
        />
      )}
      
      {editTarget && (
        <AddNewPropertyModal
          editData={editTarget}
          onClose={() => setEditTarget(null)}
          onSubmit={wrappedHandleEdit}
        />
      )}

      <Pagination
        showing={paginatedData.length}
        total={totalCount}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        canPrev={page > 0}
        canNext={page < totalPages - 1}
      />
    </div>
  );
}
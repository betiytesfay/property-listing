import { useState, useEffect, useCallback } from "react";

export function useListings(pageSize: number) {
  const [listings, setListings] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [editTarget, setEditTarget] = useState<any | null>(null);

  // FETCH ACTION: GET /api/v1/properties/me/listings
  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const skip = page * pageSize;
      // In real scenarios, add your base search query configurations if supported by backend,
      // or filter raw data rows client-side if needed.
      const response = await fetch(
        `/api/v1/properties/me/listings?skip=${skip}&limit=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            // "Authorization": `Bearer ${token}` <-- Add user authentication here
          }
        }
      );

      if (!response.ok) throw new Error("Could not retrieve property metadata.");
      
      const result = await response.json();
      setListings(result.data || []);
      setTotalCount(result.total || 0);
    } catch (err: any) {
      setError(err.message || "An unresolved network event occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  // Trigger data synchronization whenever pagination markers shift
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // DELETE ACTION: DELETE /api/v1/properties/{property_id}
  const handleDelete = async () => {
    if (!deleteTarget?.property_id) return;
    
    try {
      const response = await fetch(`/api/v1/properties/${deleteTarget.property_id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Failed to delete the specified listing.");
      
      setDeleteTarget(null);
      fetchListings(); // Refresh local list state
    } catch (err: any) {
      alert(err.message);
    }
  };

  // EDIT ACTION: PUT /api/v1/properties/{property_id} (or PATCH)
  const handleEdit = async (formDataPayload: FormData) => {
    if (!editTarget?.property_id) return;

    try {
      // If updating multi-part binary items (images) along with structural attributes,
      // use PUT as specified by your api specs.
      const response = await fetch(`/api/v1/properties/${editTarget.property_id}`, {
        method: "PUT",
        body: formDataPayload, // Automatically sets multi-part boundaries
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed updating target profile contents.");

      setEditTarget(null);
      fetchListings(); 
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Client side live search application overlaying retrieved dataset rows
  const filteredListings = listings.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.address?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    listings: filteredListings,
    isLoading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalCount,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    handleDelete,
    handleEdit,
  };
}
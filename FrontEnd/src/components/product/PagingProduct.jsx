import { Pagination, Stack } from '@mui/material'
import { useState } from 'react'

const PagingProduct = ({
  pageNumber,
  totalPages,
  onFilterSearchPagination,
}) => {
  const [page, setPage] = useState(pageNumber + 1 || 1)
  const handlePageChange = (event, newPage) => {
    onFilterSearchPagination({ pageNumber: newPage })
  }

  return (
    <>
      <div className="flex items-center justify-center mt-10 pb-10">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  )
}

export default PagingProduct

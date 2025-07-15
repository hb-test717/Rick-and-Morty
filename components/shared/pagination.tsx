"use client";

import { ButtonGroup, Pagination as ChakraPagination, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import chevronLeft from "@/public/chevron-left.svg"
import chevronRight from "@/public/chevron-right.svg"
import { useRouter } from 'next/navigation'

import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  total: number;
  page: number;
  pageSize?: number;
  defaultPage?: number;
}

/**
 * A reusable Pagination component. Upon page change, it updates the
 * `page` query string while maintaining other query string parameters.
 */
const Pagination = ({ total, page, pageSize = 20, defaultPage = 1 }: PaginationProps) => {
  const searchParams = new URLSearchParams(useSearchParams())
  const pathname = usePathname()
  const router = useRouter()

  const handlePageChange = ({ page }: { page: number }) => {
    searchParams.set("page", page.toString())

    router.push(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <ChakraPagination.Root count={total} pageSize={pageSize} defaultPage={defaultPage} page={page} onPageChange={handlePageChange}>
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <Image
              priority
              src={chevronLeft}
              alt="Previous page"
            />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page: { value: number }) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />
        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <Image
              priority
              src={chevronRight}
              alt="Next page"
            />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  )
}

export default Pagination;

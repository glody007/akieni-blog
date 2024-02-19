'use client';

import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
  
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
 
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
 
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };


  const navigateToPage = (pageNumber: number) => {
    replace(createPageURL(pageNumber));
  }
 
  const previousPage = () => {
    navigateToPage(currentPage - 1)
  }

  const nextPage = () => {
    navigateToPage(currentPage + 1)
  }

  return (
    <PaginationComponent>
        <PaginationContent>
            {currentPage !== 1 && (
                <PaginationItem onClick={previousPage} >
                    <PaginationPrevious />
                </PaginationItem>
            )}
            {totalPages > 2 && (
                <>
                    {Array.from(Array(totalPages).keys()).map(pageNumber => pageNumber + 1).map(pageNumber => (
                        <PaginationItem 
                            key={pageNumber} 
                            onClick={() => navigateToPage(pageNumber)}
                            className={cn({"bg-muted": pageNumber === currentPage})}
                        >
                            <PaginationLink>
                                {pageNumber }
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </>
            )}
            {currentPage !== totalPages &&(
                <PaginationItem onClick={nextPage}>
                    <PaginationNext />
                </PaginationItem>
            )}
        </PaginationContent>
    </PaginationComponent>
  )
}
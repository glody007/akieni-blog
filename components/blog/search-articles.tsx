"use client"

import { Input } from "../ui/input"
import { useRef, useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import { useGetSearchedArticles } from "@/data/get-searched-articles"
import { SearchResults, SearchingPlaceholder } from "./results-search"

export function SearchArticle() {
    const [searchInput, setSearchInput] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const formRef = useDetectClickOutside({
        onTriggered: () => {
            inputRef.current?.blur()
            setSearchInput("")
        },
        triggerKeys: ['Escape'],
    });

    const { isFetching, data, refetch } = useGetSearchedArticles(searchInput)

    return (
        <div ref={formRef} className="relative">
            <Input 
                ref={inputRef}
                value={searchInput}
                placeholder="Search articles..." 
                className="w-80 hidden sm:block focus-visible:ring-0" 
                onChange={(e) => {
                    setSearchInput(e.currentTarget.value || "")
                    refetch()
                }}
            />
            {searchInput !== "" && (
                <div className="absolute right-0 w-[500px] bg-background border rounded mt-1">
                    {isFetching ? (
                        <SearchingPlaceholder />
                    ) : (
                        <SearchResults 
                            articles={!data ? [] : data} 
                            handleClick={() => setSearchInput("")}
                        />
                    )}
                </div>
            )}
        </div>
    )
}


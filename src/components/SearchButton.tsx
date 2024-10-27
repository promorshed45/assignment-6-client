import { Input } from "@nextui-org/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import useDebounce from "../hooks/useDebounce";
import { useSearchPost } from "../hooks/search.hook";
import { ISearchResult } from "../types";

const SearchButton = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: handleSearch, data, isLoading: isPending, isSuccess } = useSearchPost();
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const router = useRouter();

  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSeeAll(data.search);
  };

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/posts?query=${queryString}`);
    setSearchResults([]);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const handleResultClick = () => {
    setSearchResults([]); // Clear search results on clicking a result
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("search")}
            isClearable
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            radius="md"
            startContent={
              <SearchIcon className="text-black/50 size-5 mr-1 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="absolute z-70 right-10 top-16 rounded-xl w-96 bg-default-100 p-3">
          <div className="space-y-3">
            {searchResults.map((item, index) => (
              <Link
                key={index}
                className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                href={`/posts/${item.id}`}
                onClick={handleResultClick} // Clear results on click
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="item"
                      className="h-20 w-20 rounded-md"
                      height={400}
                      src={item.thumbnail}
                      width={500}
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                        {item.description.slice(0, 60)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => handleSeeAll(searchTerm)}
            >
              <span>See All</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchButton;

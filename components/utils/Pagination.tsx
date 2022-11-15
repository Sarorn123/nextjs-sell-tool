import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import { getAdminProductState } from "../../redux/slice/admin/productSlice";

type Props = {
  pagination: {
    totalPage: number;
    totalPerPage: number;
    pageNumber: number;
    total: number;
  };
  changePage: any;
};

export default function Pagination({ pagination, changePage }: Props) {
  const loopPage = (totalPage: number) => {
    let arr = [];
    for (let i = 1; i <= totalPage; i++) {
      arr.push(i);
    }
    return arr;
  };

  const handleNextPrevous = (type: string) => {
    const currentPage = pagination.pageNumber;
    let change = currentPage;
    if (type == "next") {
      change = change + 1;
    } else {
      change = change - 1;
    }
    changePage(change);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-800 dark:text-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button text="Back" action={() => {}} />
        <Button text="Next" action={() => {}} />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
        <div>
          <p className="text-sm text-gray-500 dark:text-white font-body">
            All{" "}
            <span className="font-medium">{pagination?.total} Records</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
            aria-label="Pagination"
          >
            {loopPage(pagination?.totalPage)[0] !== pagination?.pageNumber && (
              <p
                className="cursor-pointer relative inline-flex items-center rounded-l-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => handleNextPrevous("pre")}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </p>
            )}
            {loopPage(pagination?.totalPage).map((re: any, index: number) => (
              <p
                className={`${
                  pagination.pageNumber === index + 1 && "border-cyan-500"
                } cursor-pointer relative hidden items-center border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 lg:inline-flex`}
                onClick={() => changePage(index + 1)}
                key={index}
              >
                {index + 1}
              </p>
            ))}

            {loopPage(pagination?.totalPage).at(-1) !==
              pagination?.pageNumber && (
              <p
                className="cursor-pointer relative inline-flex items-center rounded-r-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => handleNextPrevous("next")}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </p>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

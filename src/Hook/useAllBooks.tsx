import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

interface Book {
  _id: string;
  bookId: string;
  writer: string;
  bookname: string;
}

const useAllBooks = (): [Book[], () => void, boolean] => {
  const [axiosSecure] = useAxiosSecure();

  // Define the type for useQuery options
  const queryOptions = {
    queryKey: ['books'] as const,  // Ensure the queryKey is typed as a constant tuple
    queryFn: async () => {
      const res = await axiosSecure.get<Book[]>('/books/book');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,  // Example option, adjust as needed
    cacheTime: 10 * 60 * 1000, // Example option, adjust as needed
  };

  // Use useQuery with the defined options
  const {
    data: allBooks = [],  // Default value is an empty array
    refetch,
    isLoading
  }: UseQueryResult<Book[]> = useQuery<Book[]>(queryOptions);

  return [allBooks, refetch, isLoading];
};

export default useAllBooks;

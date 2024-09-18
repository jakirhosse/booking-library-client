import { useEffect, useState, ChangeEvent } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Link, useLocation } from "react-router-dom";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import SingleBook from "./SingleBook";
import LazyLoder from "../../../Components/LazyLoder/LazyLoder";

type TBook = {
  _id: string; // Changed to string to match the type used in SingleBook
  bookname: string;
  bookimage: string;
  writer: string;
  price: number;
  description: string;
  downloadUrl: string; // Added property
  bookId: string; // Added property
};

const BookSection: React.FC = () => {
  const location = useLocation();
  const [axiosSecure] = useAxiosSecure();
  const [books, setBooks] = useState<TBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<TBook | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEditButtonClick = (book: TBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    axiosSecure
      .get("/books/book")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosSecure]);

  const filteredBooks = books.filter((book) => {
    return (
      book.bookname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.writer?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const showAllBooks = location.pathname === "/user-dashboard/books-buy";

  return (
    <>
      {books.length <= 0 ? (
        <LazyLoder></LazyLoder>
      ) : (
        <div className="px-4 py-8 md:px-20 md:py-16 mx-auto">
          <div className="flex justify-between mb-8">
            <SectionTitle>Book Section</SectionTitle>
            <div>
              <input
                type="text"
                placeholder="Search by book name or writer"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id} className="bg-white border rounded-lg shadow-md">
                  <img
                    src={book.bookimage}
                    alt={book.bookname}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{book.bookname}</h3>
                    <p className="text-gray-600">{book.writer}</p>
                    <p className="text-red-600">{book.price} Coin</p>
                    <button
                      onClick={() => handleEditButtonClick(book)}
                      className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
          {isModalOpen && selectedBook && (
            <SingleBook
              selectedBook={selectedBook}
              handleModalClose={handleModalClose}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BookSection;

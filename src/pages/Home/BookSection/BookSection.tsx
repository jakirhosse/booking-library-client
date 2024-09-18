// src/pages/Home/BookSection/BookSection.tsx
import { useEffect, useState, ChangeEvent } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Link, useLocation } from "react-router-dom";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import SingleBook from "./SingleBook";
import LazyLoder from "../../../Components/LazyLoder/LazyLoder";

type TBook = {
  _id: number;
  bookname: string;
  bookimage: string;
  writer: string;
  price: number;
  rating: number;
  description: string;
  status: string;
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
          <div className="flex flex-col items-center">
            <SectionTitle titleLetter="Language  " titleWord="Library" />

            <div className="mt-4 md:flex p-4 md:space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search by book name or writer"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 md:mt-0 md:ml-4 bg-yellow-400 text-white px-4 py-2 rounded-lg"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={book.bookimage}
                    alt={book.bookname}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{book.bookname}</h3>
                    <p className="text-gray-600">{book.writer}</p>
                    <p className="text-red-600 font-semibold">{book.price} Coin</p>
                    <button
                      onClick={() => handleEditButtonClick(book)}
                      className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isModalOpen && selectedBook && (
              <SingleBook selectedBook={selectedBook} handleModalClose={handleModalClose} />
            )}

            {showAllBooks && (
              <Link
                to="/user-dashboard/books-buy"
                className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded-lg"
              >
                View All Books
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookSection;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useContext, useEffect, useState } from "react";
import "./CheckoutForm.css";
import { ImSpinner9 } from 'react-icons/im';
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

interface CheckoutFormProps {
  closeModal: () => void;
  totalAmountToBePaid: number;
  coinAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ closeModal, totalAmountToBePaid, coinAmount }) => {
  const authContext = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | undefined>(undefined);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Ensure authContext is not null before accessing user
  const user = authContext?.user;

  useEffect(() => {
    if (totalAmountToBePaid > 0) {
      axiosSecure.post("/payment/create-payment-intent", { price: totalAmountToBePaid })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("[error]", error);
        });
    }
  }, [totalAmountToBePaid, axiosSecure]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    try {
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        return;
      }

      setProcessing(true);

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Unknown",
            email: user?.email || "anonymous",
          },
        },
      });

      if (confirmError) {
        setCardError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          amount: parseFloat(totalAmountToBePaid.toString()),
          name: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        axiosSecure.post("/payment/payment-info", { paymentInfo })
          .then((res) => {
            if (res.data.insertedId) {
              axiosSecure.patch(`/users/user/${user?.email}`, {
                score: coinAmount,
              }).then(() => {
                toast.success("Payment Success");
                setProcessing(false);
                closeModal();
              });
            }
          })
          .catch(error => {
            console.error("[error]", error);
            setCardError("Failed to save payment info.");
          });
      }
    } catch (error) {
      console.error("[error]", error);
      setCardError("An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="pt-2 font-bold">আপনার কার্ডের তথ্য দিনঃ</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="modal-action flex justify-between px-5">
          <button
            onClick={closeModal}
            className="bg-red-200 px-5 py-2 rounded-md hover:bg-red-400 duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className="bg-green-200 px-5 py-2 rounded-md hover:bg-green-400 duration-200"
          >
            {processing ? (
              <ImSpinner9 className="m-auto animate-spin" />
            ) : (
              `Pay $${totalAmountToBePaid}`
            )}
          </button>
        </div>
      </form>
      {cardError && <p>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;

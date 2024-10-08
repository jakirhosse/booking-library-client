import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

interface ProfileData {
  name: string;
  bio: string;
  address: string;
  phoneNumber: number;
  birthday: string;
  gender: string;
  image?: File; // Changed to File
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileData) => void;
  singleUser: ProfileData;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  singleUser,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>();

  useEffect(() => {
    if (isOpen && singleUser) {
      const { name, bio, address, phoneNumber, birthday, gender } = singleUser;
      setValue('name', name);
      setValue('bio', bio);
      setValue('address', address);
      setValue('phoneNumber', phoneNumber);
      setValue('birthday', birthday);
      setValue('gender', gender);
      // Note: We are not setting the file input value here
    }
  }, [isOpen, singleUser, setValue]);

  const onSubmitForm = (formData: ProfileData) => {
    if (formData.image) {
      // Handle file separately if needed
      // For example, you might want to convert the file to FormData and handle it in the parent component
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <SectionTitle titleLetter='profile' titleWord='profile user' />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="space-y-4">
            {/* Name */}
            <label>
              <span className="block mb-1 mt-2 px-2">Full Name</span>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border rounded p-2"
                    required
                  />
                )}
              />
            </label>

            {/* Bio */}
            <label>
              <span className="block mb-1 mt-3 px-2">Short Bio</span>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full border rounded p-2"
                    required
                  />
                )}
              />
            </label>

            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                placeholder="photo"
                className="input input-bordered pt-2"
                accept="image/*"
                {...register('image')}
              />
            </div>

            <div className="md:flex items-center justify-center gap-2">
              {/* Birthday */}
              <label>
                <span className="w-full mt-3 px-2">Birthday</span>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="w-full border rounded p-2"
                      required
                    />
                  )}
                />
              </label>

              {/* Address */}
              <label>
                <span className="w-full mt-3 px-2">Address</span>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Address"
                      {...field}
                      className="w-full border rounded p-2"
                      required
                    />
                  )}
                />
              </label>
            </div>

            {/* Phone Number */}
            <label>
              <span className="block mt-3 px-2">Phone Number</span>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="number"
                    {...field}
                    className="w-full border rounded p-2"
                    required
                  />
                )}
              />
            </label>

            <div className="flex items-center space-x-4 text-xl">
              {/* Gender */}
              <label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        value="Male"
                        className="mr-2"
                        checked={field.value === 'Male'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Male
                    </>
                  )}
                />
              </label>
              <label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        value="Female"
                        className="mr-2"
                        checked={field.value === 'Female'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Female
                    </>
                  )}
                />
              </label>
              <label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        value="Other"
                        className="mr-2"
                        checked={field.value === 'Other'}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Other
                    </>
                  )}
                />
              </label>
            </div>

            {/* Display validation error */}
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-orange-500 text-white rounded ${
                errors.gender ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!!errors.gender}
            >
              Save
            </button>
            <button
              className="px-4 py-2 ml-4 border border-orange-500 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;

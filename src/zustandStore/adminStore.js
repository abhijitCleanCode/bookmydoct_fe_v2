const { default: axiosApi } = require("@/lib/axios");
const { default: toast } = require("react-hot-toast");
const { create } = require("zustand");
const { persist, createJSONStorage } = require("zustand/middleware");

const useAdminStore = create(
  persist(
    (set, get) => ({
      platFormFeeStore: 0,
      bookingCommissionStore: 0,
      labTestCommissionPercentageStore: 0,
      specializations: [],
      fetchLatesConstants: async () => {
        try {
          const res = await axiosApi.get("/admin/get/commission-details");
          set({
            platFormFeeStore: res.data.data.platFormFee,
            bookingCommissionStore: res.data.data.bookingCommission,
            labTestCommissionPercentageStore:
              res.data.data.labTestCommissionPercentage,
          });
        } catch (err) {
          toast.error(err);
        }
      },
      setConstants: async (formdata) => {
        try {
          const res = await axiosApi.put("/admin/update/platformFee", formdata);
          set({
            platFormFeeStore: res.data.data.platFormFee,
            bookingCommissionStore: res.data.data.bookingCommission,
            labTestCommissionPercentageStore:
              res.data.data.labTestCommissionPercentage,
          });
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Update Failed please try again!"
          );
          console.log(err);
        }
      },
      getUnverifiedClinics: async () => {
        try {
          const res = await axiosApi.get("/admin/unverified-clinics");
          return res.data;
        } catch (err) {
          toast.error(err.response?.data?.message || "Error fetching clinics");
        }
      },
      verifyClinic: async (clinicId) => {
        try {
          const res = await axiosApi.get(`/clinic/verify/${clinicId}`);
          toast.success("Clinic verified");
          return res.data;
        } catch (err) {
          toast.error(err.response.data?.message || "Error fetching clinics");
        }
      },
      getSpecializations: async () => {
        try {
          const res = await axiosApi.get(
            "api/v1/doctor/get-all-specialization"
          );
          console.log(res.data.specializations);
          set({ specializations: res.data.specializations });
          return res.data.specializations;
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Error fetching specializations"
          );
          throw err;
        }
      },
      addSpecialization: async (specializationData) => {
        try {
          const res = await axiosApi.put(
            "/admin/add/specialization",
            specializationData
          );

          const updatedSpecializations = [
            ...get().specializations,
            specializationData.specialization,
          ];
          set({ specializations: updatedSpecializations });
          toast.success("Specialization added successfully");
          return res.data;
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Error adding specialization"
          );
          throw err;
        }
      },
      deleteSpecialization: async (specializationData) => {
        try {
          await axiosApi.put(
            `/admin/delete/specialization`,
            specializationData
          );
          const updatedSpecializations = get().specializations.filter(
            (spec) => spec !== specializationData.specialization
          );
          set({ specializations: updatedSpecializations });
          toast.success("Specialization deleted successfully");
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Error deleting specialization"
          );
          throw err;
        }
      },
      getCities: async () => {
        try {
          const res = await axiosApi.get("/user/cities");
          return res.data.cities;
        } catch (err) {
          console.log(err);
        }
      },
    }),
    {
      name: "superAdminStore",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookingCommissionStore: state.bookingCommissionStore,
        labTestCommissionPercentageStore:
          state.labTestCommissionPercentageStore,
        platFormFeeStore: state.platFormFeeStore,
        specializations: state.specializations,
      }),
    }
  )
);

export default useAdminStore;

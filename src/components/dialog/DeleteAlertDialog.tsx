import { AiOutlineDelete } from "react-icons/ai";
import { deleteProduct } from "@/api/product";
import { toast } from "@/hooks/use-toast";
import { ProductType } from "@/api/product/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteProductDialogProps {
  item: ProductType; 
 
}

const DeleteAlertDialog= ({item} :DeleteProductDialogProps) => {
  const queryClient = useQueryClient()
  const { mutate: deletePro } = deleteProduct.useMutation({
    onMutate: () => openLoader(),
   
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAllProductsWithPagination"],
        });
      toast({
        title: "Delete Success",
        description: "Product deleted successfully",
      });
     
 
    },
    onError: (error) => {
      console.error("Error", error);
      toast({
        title: "Error",
        description: "There was an issue deleting the product",
        variant: "destructive",
      });
    },
    onSettled: () => hideLoader(),
  });

  const handleDelete = () => {
    deletePro(item.productID);
  }
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-100 transition duration-200"
        >
          <AiOutlineDelete />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;

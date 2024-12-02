import  {  useState } from "react";
import {   updateProduct } from "@/api/product/index";
import { ProductType, UpdateProductModel } from "@/api/product/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

interface EditableProductDialogProps {
  item: ProductType;
}
const UpdateProductDialog= ({ item } : EditableProductDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editableProduct, setEditableProduct] = useState<UpdateProductModel>({
    productID: "",
    productName: "",
    sellingPrice: 0,
    stock: 0,
    profitPerItem: 0,
  });
  const queryClient = useQueryClient()
   
  const { mutate: updatePro } = updateProduct.useMutation({
      onMutate: () => openLoader(),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAllProductsWithPagination"],
        });
        toast({
          title: "Update Success",
          description: "Product updated successfully",
        });
        setTimeout(() => setOpenDialog(false), 100); // Close dialog
      },
      onError: (error: any) => {
        console.error("Error", error);
        toast({
          title: "Error",
          description: "Something went wrong during the update",
          variant: "destructive",
        });
      },
      onSettled: () => hideLoader(), // Turn off loader
    }
  );
  const openEditDialog = (product: UpdateProductModel) => {
    setEditableProduct({
      productID: product.productID,
      productName: product.productName,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
      profitPerItem: product.profitPerItem,
    });
    setOpenDialog(true);
  };
  const saveChanges = () => {
    updatePro(editableProduct);
  };
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger  asChild>
        <AiOutlineEdit onClick={() => openEditDialog(item)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Hidden field for product ID */}
            <input type="hidden" value={editableProduct.productID} readOnly />

            {/* Product Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product Name
              </Label>
              <Input
                id="name"
                value={editableProduct.productName}
                onChange={(e) =>
                  setEditableProduct((prev) => ({ ...prev, productName: e.target.value }))
                }
                className="col-span-3"
              />
            </div>

            {/* Selling Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellingPrice" className="text-right">
                Selling Price
              </Label>
              <Input
                id="sellingPrice"
                type="number"
                value={editableProduct.sellingPrice}
                onChange={(e) =>
                  setEditableProduct((prev) => ({
                    ...prev,
                    sellingPrice: parseFloat(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>
            {/* Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={editableProduct.stock}
                onChange={(e) =>
                  setEditableProduct((prev) => ({
                    ...prev,
                    stock: parseInt(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profitPerItem" className="text-right">
                Profit Per Item
              </Label>
              <Input
                id="profitPerItem"
                type="number"
                value={editableProduct.profitPerItem}
                onChange={(e) =>
                  setEditableProduct((prev) => ({
                    ...prev,
                    profitPerItem: parseFloat(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductDialog;

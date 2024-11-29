import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { addNewProduct } from "@/api/product/index";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AddProductModel } from "@/api/product/types";



const AddProductDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<AddProductModel>({
    productName: "",
    sellingPrice: 0,
    stock: 0,
    profitPerItem: 0,
  });

  const initialPayload = {
    productName: "",
    sellingPrice: 0,
    stock: 0,
    profitPerItem: 0,
  };

  const queryClient = useQueryClient();

  const { mutate: addProduct } = addNewProduct.useMutation({
    onMutate: () => openLoader(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getAllProductsWithPagination"],
      });
      toast({
        title: "Add Success",
        description: "Product",
      });
      setPayload(initialPayload);

      setIsOpen(false);
    },
    onError: (error: any) => {
      console.error("Error", error);
      toast({
        title: "error-msg.error",
        description: "error-msg.error",
        variant: "destructive",
      });
    },
    onSettled: () => hideLoader(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payloadData: AddProductModel = {
      productName: payload.productName,
      sellingPrice: payload.sellingPrice,
      stock: payload.stock,
      profitPerItem: payload.profitPerItem,
    };
    addProduct(payloadData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add New Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details for the new product. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Product Name
            </Label>
            <Input
              id="productName"
              name="productName"
              value={payload.productName}
              onChange={handleChange}
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
              name="sellingPrice"
              value={payload.sellingPrice}
              onChange={handleChange}
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
              name="stock"
              value={payload.stock}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Profit Per Item */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profitPerItem" className="text-right">
              Profit Per Item
            </Label>
            <Input
              id="profitPerItem"
              type="number"
              name="profitPerItem"
              value={payload.profitPerItem}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

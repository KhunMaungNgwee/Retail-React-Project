import React, { useState } from 'react';

import { toast } from '@/hooks/use-toast';
import { addNewProduct, getAllProduct } from '@/api/product/index';

import api from '@/api';
import { hideLoader, openLoader } from '@/store/features/loaderSlice';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface AddProductModel {
  productName: string;
  sellingPrice: number;
  stock: number;
  profitPerItem: number;
}

const AddProductDialog = () => {
  const [isOpen, setIsOpen] = useState(false); // State for controlling dialog visibility
  const [payload, setPayload] = useState<AddProductModel>({
    productName: '',
    sellingPrice: 0,
    stock: 0,
    profitPerItem: 0,
  });

  const initialPayload = {
    productName: '',
    sellingPrice: 0,
    stock: 0,
    profitPerItem: 0,
  };

  const {refetch} = getAllProduct.useQuery();


  const { mutate: addProduct } = addNewProduct.useMutation({
    onMutate: () => openLoader(),
    onSuccess: () => {
        toast({
            title: ('Add Success'),
            description: ('Product'),
        })
      setPayload(initialPayload);
      refetch(); 
      setIsOpen(false); 
    },
    onError: (error: any) => {
      console.error('Error', error);
      toast({
        title: ('error-msg.error'),
        description: ('error-msg.error'),
        variant: 'destructive'
    })
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
        <button
          onClick={() => setIsOpen(true)}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
      </DialogTrigger>

      <DialogContent className="p-8 rounded border border-gray-200 max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Product Name Input */}
          <div className="mb-4">
            <label htmlFor="productName" className="text-sm text-gray-700 block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={payload.productName}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter product name"
            />
          </div>

          {/* Selling Price Input */}
          <div className="mb-4">
            <label htmlFor="sellingPrice" className="text-sm text-gray-700 block mb-1 font-medium">Selling Price</label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={payload.sellingPrice}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter selling price"
            />
          </div>

          {/* Stock Input */}
          <div className="mb-4">
            <label htmlFor="stock" className="text-sm text-gray-700 block mb-1 font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={payload.stock}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Profit Per Item Input */}
          <div className="mb-4">
            <label htmlFor="profitPerItem" className="text-sm text-gray-700 block mb-1 font-medium">Profit Per Item</label>
            <input
              type="number"
              id="profitPerItem"
              name="profitPerItem"
              value={payload.profitPerItem}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter profit per item"
            />
          </div>

          <DialogFooter>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

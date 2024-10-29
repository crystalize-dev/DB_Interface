'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { ProductsContext } from '@/app/context/ProductsContext';
import { ProductType } from '@/app/types/DataTypes';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AddProductPage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const { getCategories, addProduct } = useContext(ProductsContext);

    const categories = getCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [categoryInput, setCategoryInput] = useState('');

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('productName') as string;
        const price = formData.get('productPrice') as string;
        const productQuantity = formData.get('productQuantity') as string;

        if (Number(productQuantity) < 0) {
            toast.error('Количество товара не может быть отрицательным');
            return;
        }

        const newProduct: ProductType = {
            ProductName: name,
            Category: categoryInput,
            StockQuantity: Number(productQuantity),
            Price: Number(price)
        };

        await addProduct(newProduct, setFetching);
    };

    const handleSelectCategory = (category: string) => {
        setCategoryInput(category);
        setSelectedCategory(category);
    };

    const handleCategoryType = (value: string) => {
        if (categories.includes(value)) {
            setSelectedCategory(value);
        } else {
            setSelectedCategory(undefined);
        }

        setCategoryInput(value);
    };

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-8">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    variant="colored"
                    disabled={fetching}
                    buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                >
                    <Icon icon="arrowLeft" className="!size-5" />
                    Назад
                </Button>
                <h1 className="text-4xl font-bold text-dark-bg">
                    Добавление товара
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <form
                    onSubmit={submit}
                    className="scrollable flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
                >
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                        Новый товар:
                    </h1>

                    <div className="flex w-full grow flex-col gap-4 p-8">
                        <Input
                            disabled={fetching}
                            name="productName"
                            type="text"
                            required
                            placeholder="Наименование товара"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="number"
                            name="productPrice"
                            required
                            placeholder="Цена"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="number"
                            name="productQuantity"
                            required
                            placeholder="Кол-во"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="text"
                            required
                            placeholder="Категория"
                            defaultValue={categoryInput}
                            className="!w-full"
                            onType={handleCategoryType}
                            inputClassName="bg-light-object"
                        />

                        <Button
                            disabled={fetching}
                            type="submit"
                            variant="colored"
                            className="mt-auto w-full"
                            buttonClassName="bg-dark-object hover:bg-primary transition-all"
                        >
                            Добавить
                        </Button>
                    </div>
                </form>

                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                        Доступные категории:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${selectedCategory === category && 'bg-primary !text-white'} ${fetching && 'cursor-not-allowed opacity-50'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => handleSelectCategory(category)
                                }
                            >
                                {selectedCategory === category && (
                                    <Icon icon="ok" />
                                )}

                                {category}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;

'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { ProductsContext } from '@/app/context/ProductsContext';
import { ProductType } from '@/app/types/DataTypes';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const EditPage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();
    const { id } = useParams();

    const { products, getCategories, updateProduct } =
        useContext(ProductsContext);

    const [product, setProduct] = React.useState<null | ProductType>(null);

    const categories = getCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [categoryInput, setCategoryInput] = useState(product?.Category || '');

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

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('newProductName') as string;
        const price = formData.get('newProductPrice') as string;

        const updatedProduct: ProductType = {
            ...product,
            ProductName: name,
            Price: Number(price),
            Category: categoryInput
        };

        await updateProduct(updatedProduct, setFetching);
    };

    useEffect(() => {
        setProduct(products.find((p) => p.ProductID === Number(id)) || null);
    }, [id, products]);

    useEffect(() => {
        if (!product) return;

        setCategoryInput(product.Category as string);
        setSelectedCategory(product.Category);
    }, [product]);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-8">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    disabled={fetching}
                    variant="colored"
                    buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                >
                    <Icon icon="arrowLeft" className="!size-5" />
                    Назад
                </Button>
                <h1 className="text-dark-bg text-4xl font-bold">
                    {product?.ProductName}
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <form
                    onSubmit={submit}
                    className="flex w-fit flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
                >
                    <h1 className="from-dark-bg to-dark-object bg-gradient-to-br p-4 px-6 text-xl font-bold text-white">
                        Изменить товар:
                    </h1>

                    <div className="flex w-full grow flex-col gap-4 p-8">
                        <Input
                            name="newProductName"
                            type="text"
                            disabled={fetching}
                            required
                            defaultValue={product?.ProductName}
                            placeholder="Наименование товара"
                            className="!w-fit"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            type="number"
                            name="newProductPrice"
                            disabled={fetching}
                            defaultValue={product?.Price}
                            required
                            placeholder="Цена"
                            className="!w-fit"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            type="text"
                            required
                            disabled={fetching}
                            placeholder="Категория"
                            defaultValue={categoryInput}
                            className="!w-fit"
                            onType={handleCategoryType}
                            inputClassName="bg-light-object"
                        />

                        <Button
                            type="submit"
                            variant="colored"
                            disabled={fetching}
                            className="mt-4 w-full"
                            buttonClassName="bg-dark-object hover:bg-primary transition-all"
                        >
                            Изменить
                        </Button>
                    </div>
                </form>

                <div className="flex w-fit flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="from-dark-bg to-dark-object bg-gradient-to-br p-4 px-8 text-xl font-bold text-white">
                        Доступные категории:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 px-4">
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

export default EditPage;

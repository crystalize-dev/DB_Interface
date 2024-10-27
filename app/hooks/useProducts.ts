import { useEffect, useState } from 'react';
import { ProductType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [fetchingProducts, setFetchingProducts] = useState(false);

    const router = useRouter();

    const API = 'products';

    const addProduct = async (
        product: ProductType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('POST', API, setFetching, {
            data: product,
            loadingString: 'Добавляем товар...',
            successString: 'Товар добавлен!',
            actionOnSuccess: (data) => {
                setProducts([...products, data as ProductType]);
                router.push(`/${API}`);
            }
        });
    };

    const removeProduct = async (
        productId: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('DELETE', API, setFetching, {
            data: { productId },
            loadingString: 'Удаляем товар...',
            successString: 'Товар удален!',
            actionOnSuccess: () => {
                setProducts(
                    products.filter(
                        (product) => product.ProductID !== productId
                    )
                );
            }
        });
    };

    const updateProduct = async (
        updatedProduct: ProductType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('PUT', API, setFetching, {
            data: updatedProduct,
            loadingString: 'Обновляем товар...',
            successString: 'Изменения сохранены!',
            actionOnSuccess: () => {
                setProducts(
                    products.map((p) =>
                        p.ProductID === updatedProduct.ProductID
                            ? updatedProduct
                            : p
                    )
                );
                router.push(`/${API}`);
            }
        });
    };

    const getCategories: () => string[] = () => {
        if (!products.length) return [];

        const categories = products
            .map((product) => product.Category)
            .filter((category): category is string => category !== undefined);

        return Array.from(new Set(categories));
    };

    useEffect(() => {
        setFetchingProducts(true);

        customAxios('GET', 'products', setFetchingProducts, {
            actionOnSuccess: (data) => {
                setProducts(data as ProductType[]);
            },
            actionOnFailure: () => {
                toast.error('Ошибка подключения к БД!');
            }
        }).then(() => setFetchingProducts(false));
    }, []);

    return {
        products,
        fetchingProducts,
        addProduct,
        removeProduct,
        updateProduct,
        getCategories
    };
};

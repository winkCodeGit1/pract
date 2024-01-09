import axiosInstance from 'utils/axios';
import { hmis_diet_kitchen_services } from '../urls';

export async function dietArticleSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.post(
      hmis_diet_kitchen_services + 'DietArticle/edit',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_diet_kitchen_services + 'DietArticle/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function dietArticleGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'DietArticle/getAll', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.dietArticleName }));
}

export async function dietArticleGetUomId({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'DietArticle/getUomId', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.uomName }));
}

export async function mealTypeGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'MealType/all', {
    signal,
  });
  // return data.map((el) => ({ ...el, starttime: calculateHoursAndMinutes(el.starttime), endtime: calculateHoursAndMinutes(el.endtime) }));

  return data.map((el) => ({ ...el, label: el.mealname }));
}

export async function mealTypeSave({ signal, req, row }) {
  if (row) {
    console.log(req, '---req');
    const { data } = await axiosInstance.put(hmis_diet_kitchen_services + 'MealType/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_diet_kitchen_services + 'MealType/save', req, {
      signal,
    });
    return data;
  }
}

export async function foodItemGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'FoodItem/getAll', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.foodItemName, id: el.foodId }));
}

export async function foodItemSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.post(hmis_diet_kitchen_services + 'FoodItem/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_diet_kitchen_services + 'FoodItem/save', req, {
      signal,
    });
    return data;
  }
}

export async function getFoodItem({ queryKey, signal }) {
  const { data } = await axiosInstance(`${hmis_diet_kitchen_services}FoodItem/${queryKey[1]}`, {
    signal,
  });

  const articleData = data.dietArticleDtos.map((data) => ({
    id: data.id,
    dietArticleName: data.dietArticleName,
    quantity: data.quantity,
  }));
  return articleData;
}

export async function orderSetGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'OrderSet/getAll', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.orderSetname }));
}

export async function orderSetItemSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_diet_kitchen_services + 'OrderSet/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_diet_kitchen_services + 'OrderSet/save', req, {
      signal,
    });
    return data;
  }
}

export async function getOrderSet({ queryKey, signal }) {
  const { data } = await axiosInstance(`${hmis_diet_kitchen_services}OrderSet/${queryKey[1]}`, {
    signal,
  });

  const orderData = data.foodItemDtos.map((data) => ({
    foodId: data.foodId,
    dietArticleName: data.foodItemName,
    quantity: data.quantity,
  }));

  return orderData;
}

export async function dietCycleGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'DietCycle/all', {
    signal,
  });
  return data;
}

export async function dietCycleSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_diet_kitchen_services + 'DietCycle/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_diet_kitchen_services + 'DietCycle/save', req, {
      signal,
    });
    return data;
  }
}
export const BulkMealOrderGetAll = async ({ signal }) => {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'BulkMealOrder/getAll', {
    signal,
  });
  return data;
};
export const BulkMealOrderGetById = async (id) => {
  const { data } = await axiosInstance(hmis_diet_kitchen_services + 'BulkMealOrder/getById/' + id);
  return data;
};

export async function BulkMealOrderSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_diet_kitchen_services + 'BulkMealOrder/edit',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_diet_kitchen_services + 'BulkMealOrder/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

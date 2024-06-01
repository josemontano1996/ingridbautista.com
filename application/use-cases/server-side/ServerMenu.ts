'use server';

import { mapDbMenutoDto } from '@/application/dto/MenuDto';
import { IMenuRepository } from '@/infrastructure/persistence/respositories/MenuRepository';

export const ServerGetMenu = async (context: {
  menuRepository: IMenuRepository;
}) => {
  const { menuRepository } = context;

  const dbMenu = await menuRepository.getMenu();

  if (!dbMenu) {
    return [];
  }

  return mapDbMenutoDto(dbMenu);
};

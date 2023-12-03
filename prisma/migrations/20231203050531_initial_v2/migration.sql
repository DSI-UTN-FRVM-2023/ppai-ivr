-- AlterTable
ALTER TABLE `Cliente` MODIFY `nroCelular` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `InformacionCliente` MODIFY `datoAValidar` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Llamada` MODIFY `descripcionOperador` VARCHAR(191) NULL DEFAULT '',
    MODIFY `detalleAccionRequerida` VARCHAR(191) NULL DEFAULT '',
    MODIFY `duracion` DOUBLE NULL;

-- CreateTable
CREATE TABLE `Accion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpcionValidacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `correcta` BOOLEAN NOT NULL,
    `validacionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Validacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mensajeValidacion` VARCHAR(191) NOT NULL,
    `subOpcionLlamadaId` INTEGER NULL,
    `opcionLlamadaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InformacionCliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datoAValidar` VARCHAR(191) NOT NULL,
    `opcionCorrectaId` INTEGER NOT NULL,
    `validacionId` INTEGER NOT NULL,
    `clienteId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `nroCelular` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CambioEstadoLlamada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaHoraInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estadoId` INTEGER NOT NULL,
    `llamadaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubOpcionLlamada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `nroOrden` INTEGER NOT NULL,
    `opcionLlamadaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpcionLlamada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `nroOrden` INTEGER NOT NULL,
    `categoriaLlamadaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaLlamada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Llamada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionOperador` VARCHAR(191) NOT NULL,
    `detalleAccionRequerida` VARCHAR(191) NOT NULL,
    `duracion` DOUBLE NOT NULL,
    `clienteId` INTEGER NULL,
    `opcionSeleccionadaId` INTEGER NULL,
    `subOpcionSeleccionadaId` INTEGER NULL,
    `estadoActualId` INTEGER NULL,
    `accionRequeridaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OpcionValidacion` ADD CONSTRAINT `OpcionValidacion_validacionId_fkey` FOREIGN KEY (`validacionId`) REFERENCES `Validacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Validacion` ADD CONSTRAINT `Validacion_subOpcionLlamadaId_fkey` FOREIGN KEY (`subOpcionLlamadaId`) REFERENCES `SubOpcionLlamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Validacion` ADD CONSTRAINT `Validacion_opcionLlamadaId_fkey` FOREIGN KEY (`opcionLlamadaId`) REFERENCES `OpcionLlamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InformacionCliente` ADD CONSTRAINT `InformacionCliente_opcionCorrectaId_fkey` FOREIGN KEY (`opcionCorrectaId`) REFERENCES `OpcionValidacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InformacionCliente` ADD CONSTRAINT `InformacionCliente_validacionId_fkey` FOREIGN KEY (`validacionId`) REFERENCES `Validacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InformacionCliente` ADD CONSTRAINT `InformacionCliente_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CambioEstadoLlamada` ADD CONSTRAINT `CambioEstadoLlamada_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `Estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CambioEstadoLlamada` ADD CONSTRAINT `CambioEstadoLlamada_llamadaId_fkey` FOREIGN KEY (`llamadaId`) REFERENCES `Llamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubOpcionLlamada` ADD CONSTRAINT `SubOpcionLlamada_opcionLlamadaId_fkey` FOREIGN KEY (`opcionLlamadaId`) REFERENCES `OpcionLlamada`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpcionLlamada` ADD CONSTRAINT `OpcionLlamada_categoriaLlamadaId_fkey` FOREIGN KEY (`categoriaLlamadaId`) REFERENCES `CategoriaLlamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llamada` ADD CONSTRAINT `Llamada_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llamada` ADD CONSTRAINT `Llamada_opcionSeleccionadaId_fkey` FOREIGN KEY (`opcionSeleccionadaId`) REFERENCES `OpcionLlamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llamada` ADD CONSTRAINT `Llamada_subOpcionSeleccionadaId_fkey` FOREIGN KEY (`subOpcionSeleccionadaId`) REFERENCES `SubOpcionLlamada`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llamada` ADD CONSTRAINT `Llamada_estadoActualId_fkey` FOREIGN KEY (`estadoActualId`) REFERENCES `Estado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llamada` ADD CONSTRAINT `Llamada_accionRequeridaId_fkey` FOREIGN KEY (`accionRequeridaId`) REFERENCES `Accion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

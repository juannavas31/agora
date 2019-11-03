
SOURCE_DIR = ./contracts
OUTPUT_DIR = ./bin
FLAGS = --bin --abi --ast --asm --overwrite

#dependendy rule
$(OUTPUT_DIR)/%.bin: $(SOURCE_DIR)/%.sol
	solc -o $(OUTPUT_DIR) $(FLAGS) $^
	# esa seria una sentencia generica para todos los ficheros en SOURCE_DIR

all: $(OUTPUT_DIR)/CompanyState.bin $(OUTPUT_DIR)/RewardCoin.bin $(OUTPUT_DIR)/Factory.bin 

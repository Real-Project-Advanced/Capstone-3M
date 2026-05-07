# SCRIPT DE ENTRENAMIENTO (PARA GOOGLE COLAB O LOCAL CON GPU)
# Este script usa Unsloth para un entrenamiento ultra-rápido

from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# 1. Configuración del modelo
max_seq_length = 2048 # Longitud máxima de texto
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/llama-3-8b-bnb-4bit", # Versión optimizada para poca memoria
    max_seq_length = max_seq_length,
    load_in_4bit = True,
)

# 2. Añadir adaptadores LoRA (Esto es lo que hace el fine-tuning eficiente)
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # Rango de la matriz (ajustable)
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
)

# 3. Cargar tu dataset (el que generamos en la terminal)
dataset = load_dataset("json", data_files="dataset.jsonl", split="train")

# 4. Configurar el entrenamiento
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "instruction", # El campo de tu JSONL
    max_seq_length = max_seq_length,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60, # Número de pasos de entrenamiento
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        output_dir = "outputs",
    ),
)

# 5. ¡A ENTRENAR!
trainer.train()

# 6. Guardar y Exportar a GGUF (para Ollama)
model.save_pretrained_gguf("model_paisa", tokenizer, quantization_method = "q4_k_m")

print("✅ Fine-Tuning completado. El archivo .gguf está listo para Ollama.")

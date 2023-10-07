<template>
  <div class="p-4">
    <h1>Save card</h1>
    <hr />
    <div class="row">
      <div class="col-12">
        <form class="form">
          <div class="row">
            <div class="col-12 mb-2 mb-3">
              <div>
                <label class="form-label">Card number</label>
                <input
                  type="number"
                  class="form-control"
                  maxlength="16"
                  v-model="request.card_number"
                />
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div>
                <label class="form-label">CVV</label>
                <input
                  type="number"
                  class="form-control"
                  maxlength="4"
                  v-model="request.cvv"
                />
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div>
                <label class="form-label">Expiration month</label>
                <input
                  type="number"
                  class="form-control"
                  maxlength="2"
                  v-model="request.expiration_month"
                />
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div>
                <label class="form-label">Expiration year</label>
                <input
                  type="number"
                  class="form-control"
                  maxlength="2"
                  v-model="request.expiration_year"
                />
              </div>
            </div>
            <div class="col-12 mb-4">
              <div>
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="request.email"
                />
              </div>
            </div>
            <div class="col-12">
              <a class="btn btn-lg btn-success" @click="saveCard">Save</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-4" v-if="showToast">
      <div class="col-12">
        <div
          class="d-flex justify-content-between align-items-center p-1 bg-primary rounded mx-auto"
          style="width: 300px"
          v-bind:class="[typeToast == 'success' ? 'bg-primary' : 'bg-danger']"
        >
          <div class="px-3">
            <p class="d-block text-center m-0">{{ toastMsg }}</p>
            <p v-if="token.length > 0" class="d-block text-center m-0">
              Token: {{ token }}
            </p>
          </div>
          <a class="btn text-light" @click="toogleToast(false)">x</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import saveCardRequest from "@/models/services/Request/saveCardRequest";
import CardService from "@/services/cardService";
import { defineComponent, ref, watch } from "vue";
import { AxiosError } from "axios";

export default defineComponent({
  name: "createCard",
  setup() {
    const service = new CardService();
    const request = ref<saveCardRequest>({} as saveCardRequest);
    const toastMsg = ref<string>("");
    const typeToast = ref<string>("");
    const showToast = ref<boolean>(false);
    const token = ref<string>("");

    const saveCard = async () => {
      try {
        token.value = await service.saveCard(request.value);
        toogleToast(true, `Card saved`, "success");
        request.value = {} as saveCardRequest;
      } catch (error) {
        if (error instanceof AxiosError) {
          toogleToast(true, error.response?.data.msg, "error");
          token.value = "";
        }
      }
    };

    const toogleToast = (show: boolean, msg?: string, type?: string) => {
      showToast.value = show;
      toastMsg.value = msg || "";
      typeToast.value = type || "success";
    };

    watch(showToast, () => {
      const time = typeToast.value == "success" ? 10 : 3;
      if (showToast.value) {
        setTimeout(() => (showToast.value = false), time * 1000);
      }
    });

    return {
      request,
      saveCard,
      toastMsg,
      toogleToast,
      typeToast,
      showToast,
      token,
    };
  },
});
</script>
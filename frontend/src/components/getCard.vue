<template>
  <div class="p-4 postion-relative">
    <h1>Search Card</h1>
    <hr />
    <form>
      <div class="row">
        <div class="col-12">
          <div class="mb-4">
            <label class="form-label">Token</label>
            <input
              type="text"
              class="form-control"
              maxlength="16"
              v-model="request"
              @focus="() => (showCardDetail = false)"
            />
          </div>
        </div>
        <div class="col-12">
          <a class="btn btn-lg btn-success" @click="searchCard">Search</a>
        </div>
      </div>
    </form>
    <div v-if="showCardDetail">
      <hr />
      <div class="row">
        <div class="col-12">
          <form>
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label">Card number</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="card.cardnumber"
                  disabled
                />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Expiration month</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="card.expirationmonth"
                />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Expiration year</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="card.expirationyear"
                />
              </div>
              <div class="col-12 my-3">
                <label class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="card.emailuser"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="showToast">
      <div class="col-12">
        <div
          class="d-flex justify-content-between align-items-center p-1 rounded mx-auto"
          style="width: 200px"
          v-bind:class="[typeToast == 'success' ? 'bg-primary' : 'bg-danger']"
        >
          <p class="d-block text-center m-0 px-3">{{ toastMsg }}</p>
          <a class="btn text-light" @click="toogleToast(false)">x</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import getCardResponse from "@/models/services/Response/getCardResponse";
import CardService from "@/services/cardService";
import { AxiosError } from "axios";

export default defineComponent({
  name: "getCard",
  setup() {
    const service = new CardService();
    const request = ref<string>("");
    const card = ref<getCardResponse>({} as getCardResponse);
    const showCardDetail = ref<boolean>(false);

    const toastMsg = ref<string>("");
    const typeToast = ref<string>("");
    const showToast = ref<boolean>(false);

    const searchCard = async () => {
      try {
        card.value = await service.getCard(request.value);
        showCardDetail.value = true;
      } catch (error) {
        if (error instanceof AxiosError) {
          toastMsg.value = error.response?.data.msg;
          showToast.value = true;
          typeToast.value = "error";
        }
        card.value = {} as getCardResponse;
        showCardDetail.value = false;
      } finally {
        request.value = "";
      }
    };

    const toogleToast = (show: boolean, msg?: string, type?: string) => {
      showToast.value = show;
      toastMsg.value = msg || "";
      typeToast.value = type || "success";
    };

    watch(showToast, () => {
      if (showToast.value) {
        setTimeout(() => (showToast.value = false), 3 * 1000);
      }
    });

    return {
      request,
      card,
      showCardDetail,
      showToast,
      toastMsg,
      typeToast,
      searchCard,
      toogleToast,
    };
  },
});
</script>
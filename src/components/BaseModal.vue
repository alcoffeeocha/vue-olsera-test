<template>
  <div class="modal-backdrop">
    <dialog open class="modal">
      <header class="modal-header">
        <slot name="header">Header</slot>
        <button type="button" class="btn-close" @click.stop="close">x</button>
      </header>

      <section class="modal-body">
        <slot> This is the default body! </slot>
      </section>

      <section class="modal-footer">
        <slot name="footer"></slot>
      </section>
    </dialog>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  border: none;
  border-radius: 5px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 0;
  max-width: 500px;
  width: 60vw;
  height: 80vh;
  min-width: 310px;
}

.modal-header,
.modal-footer {
  padding: 20px;
  display: flex;
}

.modal-header {
  position: relative;
  justify-content: space-between;
  background-color: var(--primary-color);
  color: white;
}

.modal-footer {
  display: flex;
  column-gap: 0.8rem;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 2rem 4rem;
  overflow-y: auto;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 30px;
  padding: 0;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: transparent;
  box-shadow: none;
}
</style>

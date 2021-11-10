import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  OrderedList,
  ListItem
} from '@chakra-ui/react'

function PaymentStep () {
  return (
        <Accordion allowMultiple>
            <AccordionItem>
            <h2>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                    Cara Melakukan Pembayaran
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <OrderedList>
                        <ListItem>Masukkan Kartu Anda.</ListItem>
                        <ListItem>Pilih Bahasa.</ListItem>
                        <ListItem>Masukkan PIN ATM Anda.</ListItem>
                        <ListItem>Pilih &quot;Menu Lainnya&quot;.</ListItem>
                        <ListItem>Pilih &quot;Transfer&quot;.</ListItem>
                        <ListItem>Pilih Jenis rekening yang akan Anda gunakan (Contoh: &quot;Dari Rekening Tabungan&quot;).</ListItem>
                        <ListItem>Pilih &quot;Tranfer ke rekening &quot;.</ListItem>
                        <ListItem>Masukkan nomor Account diatas (contoh: 8277089666131170).</ListItem>
                        <ListItem>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.</ListItem>
                        <ListItem>Konfirmasi, apabila telah sesuai, lanjutkan transaksi.</ListItem>
                        <ListItem>Transaksi telah selesai.</ListItem>
                </OrderedList>
            </AccordionPanel>
            </AccordionItem>
        </Accordion>
  )
}

export default PaymentStep
